<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        v-model.trim="firstName.val"
        @input="firstName.isValid = true"
      />
      <p v-if="!firstName.isValid" class="invalid">First name must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        v-model.trim="lastName.val"
        @input="lastName.isValid = true"
      />
      <p v-if="!lastName.isValid" class="invalid">Last name must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        type="text"
        name="description"
        id="description"
        rows="5"
        v-model.trim="description.val"
        @input="description.isValid = true"
      ></textarea>
      <p v-if="!description.isValid" class="invalid">Description must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input
        type="number"
        name="rate"
        id="rate"
        v-model.number="rate.val"
        @input="rate.isValid = true"
      />
      <p v-if="!rate.isValid" class="invalid">Hourly rate must be greater than 0</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Areas of Expertise</h3>
      <div>
        <input
          type="checkbox"
          name="frontend"
          id="frontend"
          value="frontend"
          v-model="areas.val"
          @change="areas.isValid = true"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="backend"
          id="backend"
          value="backend"
          v-model="areas.val"
          @change="areas.isValid = true"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="career"
          id="career"
          value="career"
          v-model="areas.val"
          @change="areas.isValid = true"
        />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!areas.isValid" class="invalid">At least one expertise must be selected</p>
    </div>
    <p v-if="!formIsValid" id="invalid" class="invalid">Please fix the above errors and submit again</p>
    <base-button>Register</base-button>
  </form>
</template>


<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      firstName: { val: '', isValid: true },
      lastName: { val: '', isValid: true },
      description: { val: '', isValid: true },
      rate: { val: null, isValid: true },
      areas: { val: [], isValid: true },
      formIsValid: true,
    };
  },
  methods: {
    validateForm() {
      this.formIsValid = true;
      this.firstName.isValid = this.firstName.val !== '';
      this.lastName.isValid = this.lastName.val !== '';
      this.description.isValid = this.description.val !== '';
      this.rate.isValid = this.rate.val && this.rate.val > 0;
      this.areas.isValid = this.areas.val.length > 0;
      
      this.formIsValid =
        this.firstName.isValid &&
        this.lastName.isValid &&
        this.description.isValid &&
        this.rate.isValid &&
        this.areas.isValid;
    },

    submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      const formData = {
        firstName: this.firstName.val,
        lastName: this.lastName.val,
        description: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val,
      };
      this.$emit('save-data', formData);
    },
  },
};
</script>


<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

p {
  margin-top: -1px;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}

.invalid p {
  color: red;
  font-size: 12px;
}

#invalid{
  color: red;
}
</style>
