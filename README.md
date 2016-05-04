Red Hat Mobile Application Platform & JBoss BPMSuite Integration Cloud App Demo
===============================================================================

This is the Red Hat Mobile Application Platform (MAP) - JBoss BPMSuite (BPMS) integration demo that provides examples of a form-based client application (Cordova Light Forms App).

Import the project into RH MAP
------------------------------
* Prerequisites:
	- Obtain a login and domain from the Red Hat Mobile team if you don't already have them.

1. Login to the appropriate RH MAP domain.

2. Projects -> New Projects -> Choose Bare Project -> Enter a name for your project -> Click on Finish.

3. Create a Cloud App -> Import Existing App -> Next -> Enter App Name -> select Public Git Repository.

4. Enter Git URL as https://github.com/jbossdemocentral/mobile-bpms-cloudapp-integration-demo.git -> Import and move onto integration -> Finished - Take me to My App!

5. Add the BPM environment variables (left panel of the cloud app) and the appropriate values for them and push them:

	- BPM_HOST
	- BPM_USER
	- BPM_PASSWORD
	- BPM_DEPLOYMENT_ID
	- BPM_PORT

    ![alt text](
https://raw.githubusercontent.com/jbossdemocentral/mobile-bpms-cloudapp-integration-demo/master/screenshots/RHMAPCloudAppEnvVariables.png "RHMAP Cloud App Env Variables")

6. Deploy the Cloud App (left panel of the cloud app).

    ![alt text](
https://raw.githubusercontent.com/jbossdemocentral/mobile-bpms-cloudapp-integration-demo/master/screenshots/RHMAPCloudAppDeploy.png "RHMAP Cloud App Deploy")

7. Continue with importing [Client App](https://github.com/jbossdemocentral/mobile-bpms-clientapp-integration-demo).

Notes
-----
This project is a bare git repo for the cloud app that can be imported into RH MAP.

Supporting Articles
-------------------
- [Red Hat Mobile Application Platform - Connecting to JBoss BPMSuite REST (Special Edition for Red Hat Summit 2015!)](http://maggiechu-jboss.blogspot.com/2015/06/red-hat-mobile-app-connecting-to-bpms-rest.html)
- [Using the Red Hat Mobile Unified Push Server](http://www.ossmentor.com/2015/07/using-red-hat-mobile-unified-push-server.html)