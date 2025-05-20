const { ZBClient } = require('zeebe-node');

//Importing all the job workers

require('./sendLoanApplication');
// Define an async main function to deploy a process, create a process instance, and log the outcome
async function main() {
  // Create a new ZBClient instance with the provided configuration
  const zbc = new ZBClient({
    brokerContactPoint: 'zeebe:26500',
    hostname: 'zeebe'
  });

  try {
    // Deploy the order management and production control pool BPMN diagram
    const loanManagement = await zbc.deployResource({
      processFilename: `./bpm_models/loan-application-system.bpmn`,
    });

    // Log the order management and production control pool BPMN diagram deployment result
    console.log('\nLoan process application BPMN deployed successfully:', JSON.stringify(loanManagement, null, 2));

  } catch (error) {
    // Handle any errors that occur during deployment
    console.error('Deployment failed:', error);
  } finally {
    // Close the ZBClient instance to release resources
    zbc.close();
  }
}

// Call the main function to execute the script
main();