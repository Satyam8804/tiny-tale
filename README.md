 ## Deployment Link :  https://main--admirable-tarsier-3a7e73.netlify.app/data



React: The code is written using React, a popular JavaScript library for building user interfaces.

## Hooks Used

useState: The useState hook is used to define and update state variables (data and wordFrequency) in a functional component.

useEffect: The useEffect hook is used to perform side effects in a functional component. It is used to fetch data and calculate word frequency when the component mounts, and also to render the chart when the word frequency changes.

useRef: The useRef hook is used to create a mutable ref object (chartDataInstance) that can hold a reference to the chart instance.

## Link:
The Link component is used for creating a link to navigate to the table section when the "Go Up" image is clicked. This component is likely from a routing library like React Router.


## Fetch Api 

Fetch API: The Fetch API is used to make an HTTP request to retrieve the text data from the provided URL.



## CSS:
The Data.css file contains the CSS styles for the data component.

## HTML elements:

The code uses various HTML elements such as div, table, thead, tbody, tr, th,td, and button to structure the content and create the table, chart container, and download button.

## Library Used for graph 
  
  Chart.js: The Chart.js library is used for rendering the bar chart. It provides a powerful and flexible way to create various types of charts.

CSV Download: The downloadCSV function is responsible for generating the CSV content and initiating the download of the top 20 words. It creates a CSV file with two columns: "Word" and "Frequency", separated by commas.
