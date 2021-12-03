# Bike4Joy
A web-based application that searches and reviews outdoor bicycle parkings in City of Toronto 

## Information
Course name: Web computing and Web Systems <br />
Group name: Bike4Joy <br />
Member 1: Bill Song <br />
Member 2: Franklin Tian <br />

### Live URL
https://bike4joy.web.app/

### Repo URL
https://github.com/billsong0407/Bike4Joy

### Dataset
City of Toronto Outdoor Bike Parking Places: https://open.toronto.ca/dataset/bicycle-parking-high-capacity-outdoor/

### Tech Stack
Frontend - React.js, JavaScript - /client/src/ <br />
Backend - PHP, MySQL - /backend/api <br />
Hosting - AWS EC2

### Notes
Search form: https://bike4joy.web.app/#search-form <br />
Object submission page: https://bike4joy.web.app/submission <br />
User registration page: https://bike4joy.web.app/registration <br />
User login page: https://bike4joy.web.app/login <br />

Others: <br />
- Implemented Add-on 3: AJAX, implementation can be found in the client JavaScript code (client/src/pages). We used an AJAX libraries called Axios, all the AJAX calls can be found in the componentDidMount() function. The state data are populated and updated in the setState(). <br />
- The location database is populated with more than 100 locations, but the vast majority of them does not have any reviews. <br />
- Put 213 Delaware Ave in the search form will take you to the results page with more than one location. Since that address has more than one type of parking spot. <br />
- Also, search by rating can take you to the results page with more than one result. <br />
- Sql script for creating the tables is located in backend/db/CreateTables.sql, the reasoning for design decisions are in backend/db/schema.txt
