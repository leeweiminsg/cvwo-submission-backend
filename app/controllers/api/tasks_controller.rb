class Api::TasksController < ApiController
    def index
        tasks = Task.order("created_at DESC")
        tasks_completed = tasks.map{ |task| {task: task, tags: task.tags.map{ |tag| tag.id}} }
        
        render json: tasks_completed
    end

    def show
        task = Task.find(params[:id])
        tags = task.tags

        render json: {task: task, tags: tags}
    end

    def create
        task_param, tag_ids = task_params
        task = Task.create(task_param)
        
        set_tasks(tag_ids, task)

        tags = task.tags

        render json: {task: task, tags: tags}
    end

    def update
        task = Task.find(params[:id])
        tags = task.tags
        task_param, tag_ids = task_params

        set_tasks(tag_ids, task)
        task.update_attributes(task_param)

        render json: {task: task, tags: tags}
    end

    def destroy
        task = Task.find(params[:id])
        task.destroy
        head :no_content, status: :ok
    end

    private
        def task_params
            all_params = params.require(:task).permit(:title, :description, :is_deleted)
            tag_params = params.require(:tag_ids)
            return all_params, tag_params
        end

        def set_tasks(tag_ids, task)
            task.tags.clear()

            tag_ids.each do |tag_id|
                tag = Tag.find(tag_id)
                task.tags << tag
            end
        end
    end