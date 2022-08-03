import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'



const CameraTrapBatchApprovalForm = (props) => {
  const onSubmit = (data) => {

  
    
    
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.cameraTrapBatchApproval?.id)
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
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>
        
          <TextField
            name="userId"
            defaultValue={props.cameraTrapBatchApproval?.userId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="batchId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Batch id
        </Label>
        
          <TextField
            name="batchId"
            defaultValue={props.cameraTrapBatchApproval?.batchId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="batchId" className="rw-field-error" />

        <Label
          name="approvedImages"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Approved images
        </Label>
        
          <TextField
            name="approvedImages"
            defaultValue={props.cameraTrapBatchApproval?.approvedImages}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="approvedImages" className="rw-field-error" />

        <Label
          name="rejectedImages"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Rejected images
        </Label>
        
          <TextField
            name="rejectedImages"
            defaultValue={props.cameraTrapBatchApproval?.rejectedImages}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="rejectedImages" className="rw-field-error" />

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

export default CameraTrapBatchApprovalForm
