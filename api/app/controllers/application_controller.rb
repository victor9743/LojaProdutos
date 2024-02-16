class ApplicationController < ActionController::API
  def formatarValor(valor)
    return format('%.2f', valor)
  end
end
