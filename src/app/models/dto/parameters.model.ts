import { DataModel } from "./data.model"

export class ParameterResponse {

public attributionHTML?: string
public attributionText?: string
public code?: number
public copyright?: string
public data: DataModel
public etag?: string
public status?: string

constructor(response? :  Partial<ParameterResponse>){
  this.data = response?.data ?? new DataModel()
}
}
