import {
  Form,
  FormError,
  FieldError,
  Label,
  DatetimeLocalField,
  TextField,
  Submit,
} from '@redwoodjs/forms'


const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}


const CameraTrapBatchForm = (props) => {
  const onSubmit = (data) => {

  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.cameraTrapBatch?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
      
        <Label
          name="dateStart"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date start
        </Label>
        
          <DatetimeLocalField
            name="dateStart"
            defaultValue={formatDatetime(props.cameraTrapBatch?.dateStart)}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="dateStart" className="rw-field-error" />

        <Label
          name="dateEnd"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date end
        </Label>
        
          <DatetimeLocalField
            name="dateEnd"
            defaultValue={formatDatetime(props.cameraTrapBatch?.dateEnd)}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="dateEnd" className="rw-field-error" />

        <Label
          name="cameraTrapId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Camera trap id
        </Label>
        
          <TextField
            name="cameraTrapId"
            defaultValue={props.cameraTrapBatch?.cameraTrapId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="cameraTrapId" className="rw-field-error" />

        <Label
          name="location"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Location
        </Label>
        
          <TextField
            name="location"
            defaultValue={props.cameraTrapBatch?.location}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="location" className="rw-field-error" />

        <Label
          name="status"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Status
        </Label>
        
          <TextField
            name="status"
            defaultValue={props.cameraTrapBatch?.status}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="status" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default CameraTrapBatchForm
