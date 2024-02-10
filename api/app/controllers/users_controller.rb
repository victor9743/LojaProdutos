class UsersController < ApplicationController
  def index
    begin
      @users = User.all

      render json: @users, status: :ok
    rescue ActiveRecord::RecordNotFound => e
      render json: { error: e.message }, status: :not_found
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end

  def show
    begin
      @user= User.find(params[:id])

      render json: @user, status: :ok
    rescue ActiveRecord::RecordNotFound => e
      render json: { error: e.message }, status: :not_found
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end

  def create
    @user= User.new({
      "usuario" => params[:usuario],
      "password" => Digest::MD5.new.update(params[:password]),
      "is_admin" => params[:is_admin]
    })

    if @user.save
      render json: { message: "usuário salvo com sucesso" }, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update
    @user= User.find(params[:id])

    if @user.update({
      "usuario" => params[:usuario],
      "password" => Digest::MD5.new.update(params[:password]),
      "is_admin" => params[:is_admin]
    })

      render json: { message: "usuário atualizado com sucesso" }, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user= User.find(params[:id])

    if @user.destroy
      render json: { message: "usuário removido com sucesso" }, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end
end
