# vsts-follower
Follow your projects on VSTS with SonarQube

## Chrome Extension
This is the chrome extension version of our follower. 
You can download it on [This link](https://chrome.google.com/webstore/detail/alm-follower/onclflpcmjmnfbefnenpakeakhneliof).

### First use
Launch extension and click on "Connect VSTS"
![first-frame](img/first-frame.png)
At the modal frame, put your vsts connection informations. For the password, only the personnal access token works.
![vsts-login](img/vsts-login.png)
When "Connect" button clicked, please click on "Connect SonarQube" button
![sonarqube-login](img/sonarqube-login.png)
To connect on sonarqube, you have to fill in the url and put a personal token in the zone password / token. Now, you can click on connect and follow your builds.

### All builds tab
It used to select builds that you want to follow.
![all-builds](img/all-builds.png)
To select one, click on toggle at the left of build definition name.

### Selection tab
It contains the selected builds and displays their details (build / sonar indicators)
![selection](img/selection.png)