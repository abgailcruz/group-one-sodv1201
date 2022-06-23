// Create Roles table
const rolesTable = `CREATE TABLE Roles (
  RoleID INT PRIMARY KEY,
  RoleName VARCHAR(100) NOT NULL
)`;

// Create Cities table
const citiesTable = `CREATE TABLE Cities (
  CityID INT PRIMARY KEY,
  CityName VARCHAR(100) NOT NULL UNIQUE
)`;

// Create Payment_Method table
const paymentMethod = `CREATE TABLE Payment_Method (
  PaymentID INT NOT NULL PRIMARY KEY,
  Card varchar(50),
  Address varchar(50) NOT NULL,
  PaymentMethod varchar(50) NOT NULL
)`;

// Create Users table
const users = `CREATE TABLE Users (
  UserID INT PRIMARY KEY,
  CityID INT REFERENCES Cities (CityID),
  PaymentID INT REFERENCES Payment_Method (PaymentID),
  RoleID INT REFERENCES Roles (RoleID),
  Name VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL,
  EmailAddress VARCHAR(255) NOT NULL UNIQUE,
  Phone Char(20),
  Active BIT DEFAULT 1
)`;

// Create Types table
const types = `CREATE TABLE Types (
  TypeID INT PRIMARY KEY,
  TypeName VARCHAR(100) NOT NULL UNIQUE
)`;

// Create Lease_team table
const leaseTeam = `CREATE TABLE Lease_team (
  LeaseID INT PRIMARY KEY,
  LeaseName VARCHAR(100) NOT NULL UNIQUE
)`;

// Create Workspaces table
const workspaces = `CREATE TABLE Workspaces (
  WorkspaceID INT PRIMARY KEY,
  PropertyName varchar(50) NOT NULL UNIQUE,
  PropertyAddress varchar(50),
  CityID INT REFERENCES Cities (CityID),
  PostalCode VARCHAR(10) NOT NULL,
  GoogleMap varchar(250),
  TypeID INT REFERENCES Types (TypeID),
  Size varchar(50) NOT NULL,
  NoOfCoworker INT,
  Parking TEXT,
  Smoking TEXT,
  DateAvailable DATETIME,
  LeaseID INT REFERENCES Lease_team (LeaseID),
  Price Money,
  UserID INT REFERENCES Users (UserID),
  Availability TEXT,
  BookingStartDate DATETIME,
  BookingEndDate DATETIME,
  ReachTransp varchar(5)
)`;

// Create Booking table
const booking = `CREATE TABLE Booking(
  BookingID INT PRIMARY KEY,
  UserID INT REFERENCES Users (UserID),
  WorkspaceID INT REFERENCES Workspaces (WorkspaceID),
  BookingStartDate DATETIME,
  BookingEndDate DATETIME,
  CreationDate DATETIME
)`;

// Create Images table
const images = `CREATE TABLE Images(
  ImageID INT NOT NULL PRIMARY KEY,
  image_URL VARCHAR (200) NOT NULL
)`;

// Create Workspaces_Image table
const workspacesImage = `CREATE TABLE Workspaces_Image (
  Workspace_ImageID INT PRIMARY KEY,
  ImageID int REFERENCES Images(ImageID),
  WorkspaceID int REFERENCES Workspaces (WorkspaceID) ON DELETE CASCADE
)`;

export default {
	rolesTable,
	citiesTable,
	paymentMethod,
	users,
	types,
	leaseTeam,
	workspaces,
	booking,
	images,
	workspacesImage
};
