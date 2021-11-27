CREATE TABLE LOCATIONS(
    id INT NOT NULL AUTO_INCREMENT,
    lat FLOAT NOT NULL,
    lng FLOAT NOT NULL,
    capacity TEXT,
    parkingType TEXT,
    address TEXT,
    postalCode TEXT,
    bikeSize FLOAT,
    yearInstalled INT,
    PRIMARY KEY (id)
);

 CREATE TABLE USERS (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    PRIMARY KEY (id, name, email) 
);

CREATE TABLE REVIEWS (
    id INT NOT NULL AUTO_INCREMENT,
    image TEXT,
    video TEXT,
    comment TEXT,
    user_id INT NOT NULL,
    rating TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES USERS(id)
);

CREATE TABLE REVIEW_TO_LOCATION (
    loc_id INT NOT NULL,
    rev_id INT NOT NULL,
    FOREIGN KEY (loc_id) REFERENCES LOCATIONS(id) on delete cascade,
    FOREIGN KEY (rev_id) REFERENCES REVIEWS(id) on delete cascade
);