defmodule TrainWhistle.LocationView do
  use TrainWhistle.Web, :view

  def render("index.json", %{locations: locations}) do
    %{locations: render_many(locations, TrainWhistle.LocationView, "location.json")}
  end

  def render("show.json", %{location: location}) do
    %{location: render_one(location, TrainWhistle.LocationView, "location.json")}
  end

  def render("location.json", %{location: location}) do
    %{id: location.id,
      name: location.name}
  end
end