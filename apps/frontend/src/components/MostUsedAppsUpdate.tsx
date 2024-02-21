// import React, { useEffect } from 'react';
// import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
// import {*} from 'd3' // Import the select function from D3
//
// // Sample SVG components for each item
// const itemSVGs = [
//     <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30">
//         {/* Add your SVG content here */}
//         <circle cx="15" cy="15" r="10" fill="blue" />
//     </svg>,
//     // Add SVGs for other items here
// ];
//
// function Dashboard() {
//     const data = [
//         { label: 'Item 6', cost: 50000, width: 252, white_rect_x: 237 },
//         { label: 'Item 8', cost: 50000, width: 244, white_rect_x: 229 },
//         { label: 'Item 7', cost: 40000, width: 219, white_rect_x: 204 },
//         { label: 'Item 3', cost: 30000, width: 115, white_rect_x: 100 },
//         { label: 'Item 5', cost: 20000, width: 93, white_rect_x: 78 },
//         { label: 'Item 10', cost: 20000, width: 69, white_rect_x: 54 },
//     ];
//
//     // Manually sort data in descending order based on the "width" attribute
//     const sortedData = [...data].sort((a, b) => b.width - a.width);
//
//     // Create a function to add the SVG elements to the chart
//     const addSVGsToChart = () => {
//         const bars = select("#bars"); // Select the container div
//         bars
//             .selectAll("svg") // Select all existing SVG elements within the container
//             .data(sortedData) // Bind data to the selection
//             .enter() // Enter the data selection
//             .append("svg") // Append an SVG element for each data point
//             .attr("width", 30) // Set the width of the SVG
//             .attr("height", 30) // Set the height of the SVG
//             .each(function (d, i) {
//                 // Inside each SVG element, append the corresponding itemSVG
//                 select(this).node().appendChild(itemSVGs[i]);
//             });
//     };
//
//     // Use useEffect to call the function when the component mounts
//     useEffect(() => {
//         addSVGsToChart();
//     }, []);
//
//     return (
//         <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
//             <VictoryAxis />
//             <VictoryAxis dependentAxis />
//             <div id="bars"></div>
//         </VictoryChart>
//     );
// }
//
// export default Dashboard;
