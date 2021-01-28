# CarsonsVillage_Website-Upgrade
EPCS3200 project to upgrade/automate the functionality and payment functions for the non-profit group "Carson's Village"

## Current Goals
Establish a working HTML and JavaScript templates to automate the display of webpages

## Working Methods

### Generate HTML file using code
One method of page generation is writing to a file using a Java, C++, or Python. 
While this method is the simplest to write and understand, it will generate a large number of pages that must be stored on an external server. 

### JavaScript + Database
Project partner has made it clear that he does not want the hassle/expense of maintaining a database server. 

### JavaScript + JQuery + PapaParse
JQuery is used to retrieve the text contents of a file. 
PapaParse is used to parse the CSV file contents. 
From there, information can be sorted and displayed on the HTML. 

In theory, this method would rely only on a CSV file stored somewhere on a secured GitHub page. 
Alternatively, it could be hosted in a secure AWS S3 bucket, providing more access control, albeit at breater cost. 

### GUI Form
A user-friendly method is required to enter text to append to the given CSV document. 
This should ideally be either an executable file or a webpage. 
