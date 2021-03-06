defmodule TrainWhistle.Location do
  use TrainWhistle.Web, :model

  schema "locations" do
    field :name, :string
    field :lat, :float
    field :long, :float

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name])
    |> validate_required([:name])
  end
end
