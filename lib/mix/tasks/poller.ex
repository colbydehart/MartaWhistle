defmodule Mix.Tasks.TrainWhistle.Poller do
  use Mix.Task
  import Ecto.Query
  alias TrainWhistle.Alarm
  alias TrainWhistle.Repo

  def run(_), do: false

  def poll do
    alarms = Repo.all(
      from p in Alarm,
      where: (is_nil(p.last_notified) or p.last_notified < fragment("current_date + start_time")) and fragment("current_date + start_time - interval '1 minute' * travel_time <= NOW()") and fragment("NOW() < current_date + end_time - interval '1 minute' * travel_time"),
      preload: [:user, :start_location]
    )
    arrivals = TrainWhistle.Arrivals.parsed_arrivals
    alarms
    |> Enum.map(fn alarm -> Task.async(fn -> check_alarm(alarm, arrivals) end) end)
    |> Enum.each(&Task.await/1)
  end

  def check_alarm(alarm, arrivals) do
    # find first matching arrival
    # TODO: name should be station name? go go go
    # TODO: time zones accurate? prob not
    {_, t} = :calendar.universal_time
    now = Timex.Duration.from_time(Time.from_erl!(t))
    start_diff = abs(Timex.Duration.diff(alarm.start_time, now, :seconds))
    end_diff = abs(Timex.Duration.diff(alarm.end_time, now, :seconds))
    station_name = Alarm.station_name(alarm)
    match = Enum.find(arrivals, fn a -> a["station"] == station_name and a["direction"] == alarm.direction and alarm.line == a["line"] and start_diff <= a["waiting_seconds"] and a["waiting_seconds"] < end_diff end)
    notify(alarm, match)
  end

  def notify(_alarm, { nil }), do: :ok
  def notify(alarm, _arrival) do
    # make sure it doesn't get picked again up for this alarm today
    changeset = Alarm.changeset(alarm, %{last_notified: DateTime.utc_now})
    Repo.update!(changeset)

    hdir = Alarm.human_direction(alarm)
    TrainWhistle.Twilio.send_message(alarm.user.phone, "time to leave for #{hdir}bound #{alarm.line} train at #{Alarm.station_name(alarm)}")
  end
end
