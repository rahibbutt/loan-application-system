<template>
    <div class="form-container">
        <div class="back-arrow">
            <RouterLink to="/">
                ← Back to Home
            </RouterLink>
        </div>
        <h2>Loan Application</h2>
        <form @submit.prevent="submitForm">
            <!-- Personal Information -->
            <fieldset>
                <legend>Personal Information</legend>
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input v-model="name" id="name" type="text" readonly required />
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input v-model="email" id="email" type="email" readonly required />
                </div>
                <div class="form-group">
                    <label for="phoneNumber">Phone Number</label>
                    <input v-model="phoneNumber" id="phoneNumber" type="tel" required />
                </div>
                <div class="form-group">
                    <label for="dateOfBirth">Date of Birth</label>
                    <input v-model="dateOfBirth" id="dateOfBirth" type="date" required />
                </div>
                <div class="form-group">
                    <label for="nationalId">National ID</label>
                    <input v-model="nationalId" id="nationalId" type="text" required />
                </div>
            </fieldset>

            <!-- Address -->
            <fieldset>
                <legend>Address</legend>
                <div class="form-group">
                    <label for="streetAddress">Street Address</label>
                    <input v-model="streetAddress" id="streetAddress" type="text" required />
                </div>
                <div class="form-group">
                    <label for="city">City</label>
                    <input v-model="city" id="city" type="text" required />
                </div>
                <div class="form-group">
                    <label for="postalCode">Postal Code</label>
                    <input v-model="postalCode" id="postalCode" type="text" required />
                </div>
                <div class="form-group">
                    <label for="country">Country</label>
                    <input v-model="country" id="country" type="text" required />
                </div>
            </fieldset>

            <!-- Employment -->
            <fieldset>
                <legend>Employment & Income</legend>
                <div class="form-group">
                    <label for="employmentStatus">Employment Status</label>
                    <select v-model="employmentStatus" id="employmentStatus" required>
                        <option value="">Select</option>
                        <option>Employed</option>
                        <option>Self-employed</option>
                        <option>Unemployed</option>
                        <option>Student</option>
                        <option>Retired</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="employerName">Employer Name</label>
                    <input v-model="employerName" id="employerName" type="text" />
                </div>
                <div class="form-group">
                    <label for="jobTitle">Job Title</label>
                    <input v-model="jobTitle" id="jobTitle" type="text" />
                </div>
                <div class="form-group">
                    <label for="annualIncome">Annual Income (€)</label>
                    <input v-model="annualIncome" id="annualIncome" type="number" min="0" required />
                </div>
                <div class="form-group">
                    <label for="lengthOfEmployment">Length of Employment (years)</label>
                    <input v-model="lengthOfEmployment" id="lengthOfEmployment" type="number" min="0" />
                </div>
            </fieldset>

            <!-- Loan Details -->
            <fieldset>
                <legend>Loan Details</legend>
                <div class="form-group">
                    <label for="loanAmount">Loan Amount (€)</label>
                    <input v-model="loanAmount" id="loanAmount" type="number" min="0" required />
                </div>
                <div class="form-group">
                    <label for="loanPurpose">Purpose</label>
                    <input v-model="loanPurpose" id="loanPurpose" type="text" required />
                </div>
                <div class="form-group">
                    <label for="loanTerm">Loan Term (months)</label>
                    <input v-model="loanTerm" id="loanTerm" type="number" min="1" required />
                </div>
                <div class="form-group">
                    <label for="repaymentFrequency">Repayment Frequency</label>
                    <select v-model="repaymentFrequency" id="repaymentFrequency" required>
                        <option value="">Select</option>
                        <option>Monthly</option>
                        <option>Quarterly</option>
                    </select>
                </div>
            </fieldset>

            <!-- Bank Info -->
            <fieldset>
                <legend>Bank Information</legend>
                <div class="form-group">
                    <label for="bankName">Bank Name</label>
                    <input v-model="bankName" id="bankName" type="text" required />
                </div>
                <div class="form-group">
                    <label for="bankAccountNumber">Account Number</label>
                    <input v-model="bankAccountNumber" id="bankAccountNumber" type="text" required />
                </div>
                <div class="form-group">
                    <label for="accountType">Account Type</label>
                    <select v-model="accountType" id="accountType" required>
                        <option value="">Select</option>
                        <option>Checking</option>
                        <option>Savings</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="existingDebts">Existing Debts (€)</label>
                    <input v-model="existingDebts" id="existingDebts" type="number" min="0" />
                </div>
            </fieldset>

            <!-- Agreement -->
            <fieldset>
                <div class="form-group">
                    <label for="applicationDate">Application Date</label>
                    <input v-model="applicationDate" id="applicationDate" type="text" readonly required />
                </div>
                <legend>Agreement</legend>
                <div class="form-group checkbox-group">
                    <input type="checkbox" id="consentToTerms" v-model="consentToTerms" required />
                    <label for="consentToTerms">I agree to the terms and conditions</label>
                </div>
            </fieldset>

            <button type="submit" class="btn-submit">Submit Application</button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { reactive } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import api from '/src/services/api'

const auth = useAuthStore()

const name = ref('')
const email = ref('')
const error = ref('')
const phoneNumber = ref('+4915123456789')
const nationalId = ref('+4915123456789')
const streetAddress = ref('+4915123456789')
const city = ref('+4915123456789')
const postalCode = ref('+4915123456789')
const country = ref('+4915123456789')
const employmentStatus = ref('+4915123456789')
const employerName = ref('+4915123456789')
const jobTitle = ref('+4915123456789')
const annualIncome = ref('+4915123456789')
const lengthOfEmployment = ref('+4915123456789')
const loanAmount = ref('+4915123456789')
const loanPurpose = ref('+4915123456789')
const loanTerm = ref('+4915123456789')
const repaymentFrequency = ref('+4915123456789')
const bankName = ref('+4915123456789')
const bankAccountNumber = ref('+4915123456789')
const accountType = ref('+4915123456789')
const existingDebts = ref('+4915123456789')
const consentToTerms = ref('+4915123456789')


const loading = ref(false)
const router = useRouter()

onMounted(() => {
    if (auth.user) {
        name.value = auth.user.name || ''
        email.value = auth.user.email || ''
    }
})

function getRandomDOB() {
    const start = new Date(1970, 0, 1)
    const end = new Date(2005, 0, 1)
    const dob = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    return dob.toISOString().split('T')[0]
}

const formatDate = (date = new Date()) => {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).replace(/ /g, '-')
}

const applicationDate = ref(formatDate())

const dateOfBirth = ref(getRandomDOB())

const form = reactive({
    name: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    nationalId: '',

    streetAddress: '',
    city: '',
    postalCode: '',
    country: '',

    employmentStatus: '',
    employerName: '',
    jobTitle: '',
    annualIncome: null,
    lengthOfEmployment: null,

    loanAmount: null,
    loanPurpose: '',
    loanTerm: null,
    repaymentFrequency: '',

    bankName: '',
    bankAccountNumber: '',
    accountType: '',
    existingDebts: null,

    consentToTerms: false,
    applicationDate: new Date().toISOString().substr(0, 10),
})

async function submitForm() {
  loading.value = true;
  try {
    const response = await fetch('http://localhost:3005/start-process-server', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        workflowKey: 'loan-application-system',
        variables: {
          name: name.value,
          email: email.value,
        },
      }),
    });

    const data = await response.json();
    console.log('Process started:', data);
  } catch (error) {
    console.error('Error starting process:', error);
  } finally {
    loading.value = false;
  }
}


</script>

<style scoped>
.form-container {
    background-color: #ffffff;
    color: #222;
    padding: 3rem;
    border-radius: 12px;
    border: 1px solid #ddd;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 960px;
    /* Wider container for multiple columns */
    margin: auto;
}

.form-container h2 {
    margin-bottom: 1rem;
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
}

.form-container form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}

fieldset {
    border: none;
    padding: 0;
    margin-bottom: 2rem;
}

fieldset legend {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #333;
}

.fieldset-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem 2rem;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.form-group input,
.form-group select {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    background-color: #f9f9f9;
    color: #222;
}

.form-group input:focus,
.form-group select:focus {
    border-color: #007bff;
    background-color: #fff;
    outline: none;
}

.checkbox-group {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
}

.btn-submit {
    width: 100%;
    padding: 0.75rem;
    background-color: #428d5a;
    color: #fff;
    font-weight: bold;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn-submit:hover {
    background-color: #0056b3;
}

.error {
    color: red;
    margin-top: 1rem;
    font-weight: 500;
}

.register-link {
    margin-top: 1rem;
    text-align: center;
    font-size: 0.95rem;
}

.register-link a {
    color: #007bff;
    margin-left: 0.25rem;
    text-decoration: none;
    font-weight: bold;
}
</style>
