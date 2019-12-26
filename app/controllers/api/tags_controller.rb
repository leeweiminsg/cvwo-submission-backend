class Api::TagsController < ApiController
    def index
        tags = Tag.order("created_at DESC")
        render json: tags
    end

    def create
        tag = Tag.create(tag_param)
        render json: tag
    end

    def update
        tag = Tag.find(params[:id])
        tag.update_attributes(tag_param)
        render json: tag
    end

    def destroy
        tag = Tag.find(params[:id])
        tag.destroy
        head :no_content, status: :ok
    end

    private
    def tag_param
      params.require(:tag).permit(:title, :is_deleted)
    end
end