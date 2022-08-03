import {
  Form,
  FormError,
  FieldError,
  Label,
  DatetimeLocalField,
  TextField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'


const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}


const CameraTrapEventForm = (props) => {
  const onSubmit = (data) => {

  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.cameraTrapEvent?.id)
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
          name="date"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date
        </Label>
        
          <DatetimeLocalField
            name="date"
            defaultValue={formatDatetime(props.cameraTrapEvent?.date)}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="date" className="rw-field-error" />

        <Label
          name="cameraTrapId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Camera trap id
        </Label>
        
          <TextField
            name="cameraTrapId"
            defaultValue={props.cameraTrapEvent?.cameraTrapId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="cameraTrapId" className="rw-field-error" />

        <Label
          name="projectName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Project name
        </Label>
        
          <TextField
            name="projectName"
            defaultValue={props.cameraTrapEvent?.projectName}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="projectName" className="rw-field-error" />

        <Label
          name="staffName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Staff name
        </Label>
        
          <TextField
            name="staffName"
            defaultValue={props.cameraTrapEvent?.staffName}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="staffName" className="rw-field-error" />

        <Label
          name="datetime_updated"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Datetime updated
        </Label>
        
          <DatetimeLocalField
            name="datetime_updated"
            defaultValue={formatDatetime(props.cameraTrapEvent?.datetime_updated)}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="datetime_updated" className="rw-field-error" />

        <Label
          name="cameraLocation"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Camera location
        </Label>
        
          <TextField
            name="cameraLocation"
            defaultValue={props.cameraTrapEvent?.cameraLocation}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="cameraLocation" className="rw-field-error" />

        <Label
          name="cameraProcedure"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Camera procedure
        </Label>
        
          <TextField
            name="cameraProcedure"
            defaultValue={props.cameraTrapEvent?.cameraProcedure}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="cameraProcedure" className="rw-field-error" />

        <Label
          name="cameraAttachmentPosition"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Camera attachment position
        </Label>
        
          <TextField
            name="cameraAttachmentPosition"
            defaultValue={props.cameraTrapEvent?.cameraAttachmentPosition}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="cameraAttachmentPosition" className="rw-field-error" />

        <Label
          name="cameraHeight"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Camera height
        </Label>
        
          <TextField
            name="cameraHeight"
            defaultValue={props.cameraTrapEvent?.cameraHeight}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ valueAsNumber: true }}
          />
        

        <FieldError name="cameraHeight" className="rw-field-error" />

        <Label
          name="areaDeployed"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Area deployed
        </Label>
        
          <TextField
            name="areaDeployed"
            defaultValue={props.cameraTrapEvent?.areaDeployed}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="areaDeployed" className="rw-field-error" />

        <Label
          name="cameraMake"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Camera make
        </Label>
        
          <TextField
            name="cameraMake"
            defaultValue={props.cameraTrapEvent?.cameraMake}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="cameraMake" className="rw-field-error" />

        <Label
          name="cameraTarget"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Camera target
        </Label>
        
          <TextField
            name="cameraTarget"
            defaultValue={props.cameraTrapEvent?.cameraTarget}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="cameraTarget" className="rw-field-error" />

        <Label
          name="cameraSitePhoto"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Camera site photo
        </Label>
        
          <TextField
            name="cameraSitePhoto"
            defaultValue={props.cameraTrapEvent?.cameraSitePhoto}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="cameraSitePhoto" className="rw-field-error" />

        <Label
          name="cameraWorking"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Camera working
        </Label>
        
          <CheckboxField
            name="cameraWorking"
            defaultChecked={props.cameraTrapEvent?.cameraWorking}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="cameraWorking" className="rw-field-error" />

        <Label
          name="comments"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Comments
        </Label>
        
          <TextField
            name="comments"
            defaultValue={props.cameraTrapEvent?.comments}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="comments" className="rw-field-error" />

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

export default CameraTrapEventForm
