class Api::TaskResource < JSONAPI::Resource
  attributes :title, :description, :is_deleted
end