import "./donationTable.css";
import React, { useState } from "react";

const DonationTable = ({ donationData }) => {
  // Group the donationData array by month name
  const dataByMonth = donationData.reduce((acc, data) => {
    const monthName = new Date(data.donationDateTime).toLocaleString(
      "default",
      { month: "long" }
    );
    if (!acc[monthName]) {
      acc[monthName] = [data];
    } else {
      acc[monthName].push(data);
    }
    return acc;
  }, {});

  // Use state to track whether the user has clicked the "View More" button
  const [showAllData, setShowAllData] = useState(false);

  // Get an array of month names in reverse chronological order
  const monthNames = Object.keys(dataByMonth).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  // Slice the array to get only the recent two months' data
  const recentDataByMonth = monthNames.slice(0, 2).reduce((acc, month) => {
    acc[month] = dataByMonth[month];
    return acc;
  }, {});

  // Render the recent two months' data
  const recentData = (
    <div>
      {Object.keys(recentDataByMonth).map((month) => (
        <div key={month} className="table-container">
          <h2>{month}</h2>
          <table>
            <thead>
              <tr>
                <th>Donor Name</th>
                <th>Donated Item</th>
                <th>Item Quantity</th>
                <th>Donation Date &amp; Time</th>
              </tr>
            </thead>
            <tbody>
              {recentDataByMonth[month].map((data, index) => (
                <tr key={index}>
                  <td>{data.donorName}</td>
                  <td>{data.donatedItem}</td>
                  <td>{data.itemQuantity}</td>
                  <td>{data.donationDateTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );

  // Render the "View More" button if there is more data to show
  const viewMoreButton = monthNames.length > 2 && (
    <button onClick={() => setShowAllData(true)}>View More</button>
  );

  // Render all the data if the user has clicked the "View More" button
  const allData = showAllData && (
    <div>
      {monthNames.map((month) => (
        <div key={month} className="table-container">
          <h2>{month}</h2>
          <table>
            <thead>
              <tr>
                <th>Donor Name</th>
                <th>Donated Item</th>
                <th>Item Quantity</th>
                <th>Donation Date &amp; Time</th>
              </tr>
            </thead>
            <tbody>
              {dataByMonth[month].map((data, index) => (
                <tr key={index}>
                  <td>{data.donorName}</td>
                  <td>{data.donatedItem}</td>
                  <td>{data.itemQuantity}</td>
                  <td>{data.donationDateTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {recentData}
      {viewMoreButton}
      {allData}
    </div>
  );
};

export default DonationTable;