import React from "react";
import {
  createField,
  Input,
  Textarea
} from "../../common/FormsControls/FormsControls";
import { reduxForm } from "redux-form";

const ProfileDataForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <button onClick={() => {}}>Save</button>
      </div>
      <div>
        <b>Full name: </b>
        {createField("Full name", "fullName", Input, null, [])}
      </div>
      <div>
        <b>Looking for a job: </b>
        {createField("", "lookingForAJob", Input, null, [], {
          type: "checkbox"
        })}
      </div>
      <div>
        <b>My professional skills</b>
        {createField(
          "My professional skills",
          "professionalSkills",
          Textarea,
          null,
          []
        )}
      </div>
    </form>
  );
};

const ProfileDataFormReduxForm = reduxForm({ form: "edit-profile" })(
  ProfileDataForm
);

export default ProfileDataFormReduxForm;
