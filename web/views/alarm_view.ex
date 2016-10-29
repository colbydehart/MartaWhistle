defmodule TrainWhistle.AlarmView do
  use TrainWhistle.Web, :view

  def render("index.json", %{alarms: alarms}) do
    %{alarms: render_many(alarms, TrainWhistle.AlarmView, "alarm.json")}
  end

  def render("show.json", %{alarm: alarm}) do
    %{alarm: render_one(alarm, TrainWhistle.AlarmView, "alarm.json")}
  end

  def render("alarm.json", %{alarm: alarm}) do
    %{id: alarm.id,
      start_time: parse_time(alarm.start_time),
      end_time: parse_time(alarm.end_time),
      travel_time: alarm.travel_time,
      last_notified: alarm.last_notified,
      start_location: alarm.start_location_id,
      name: alarm.name,
      line: alarm.line,
      direction: alarm.line}
  end

  def parse_time(time) do
    {hour, min, sec, _} = Timex.Duration.to_clock(time)
    %{hour: hour, min: min, sec: sec}
  end
end
