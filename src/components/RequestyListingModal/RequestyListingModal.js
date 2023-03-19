import axios from "axios";
import React, { useState, useEffect } from "react";
import "./requestyListingModal.css";

function RequestyListingModal(props) {
  const [arrOfRequestees, setArrOfRequestees] = useState(null);

  async function fetchNGOdata() {
    //console.log(props.PostID);
    try {
      const Postresponse = await axios.get(
        `http://localhost:5000/post/${props.PostID}`
      );
      console.log("Postresponse >> ", Postresponse.data);
    } catch (error) {
      console.error(error);
    }
  }
  async function fetchRequestydata(nid) {
    //console.log(nid);
    try {
      const Requesteeresponse = await axios.get(
        `http://localhost:5000/ngo?AuthID=${nid}`
      );
      //console.log("Requesteeresponse >> ", Requesteeresponse.data);
      return Requesteeresponse.data;
    } catch (error) {
      console.error(error);
    }
  }
  async function GetAllRequestyData(arr) {
    console.log(arr);
    let finalArr = [];
    for (let i = 0; i < arr.length; i++) {
      finalArr.push(await fetchRequestydata(arr[i]));
    }
    console.log("all requestees array >> ", finalArr);
    setArrOfRequestees(finalArr);
  }

  const approveBtn = (postID, ngoID) => {
    approveNGOreq(postID, {
      BookedFor: ngoID,
      BookedStatus: true,
    });
  };

  const approveNGOreq = async (id, updatedFields) => {
    const res = await axios.put(
      `http://localhost:5000/post/${id}`,
      updatedFields
    );
    res.data && alert("request approved");
    return res.data;
  };

  //fetch requesty data on initial load from server
  useEffect(() => {
    fetchNGOdata();
    GetAllRequestyData(props.RequesteeArr);
  }, []);

  if (props.openRequestyModal) {
    return (
      <>
        <div className="requestee-modal-container">
          <div id="post-id"></div>
          <div id="post-name">{props.PostID}</div>
          <h2>Requestees</h2>
          {arrOfRequestees.map((x) => {
            return (
              <div className="RequesteeInfoItem" key={x[0]._id}>
                <div className="d-flex flex-row justify-content-between">
                  <div className="d-flex flex-row align-items-center">
                    <img
                      alt="requestee logo"
                      src={x[0].ProfilePicURL}
                      className="requesteeinfoProfile"
                    />
                    <div className="d-flex flex-column">
                      <div className="requestee-name">{x[0].Name}</div>
                      <div className="requestee-level-info">
                        <div className="requestee-level">
                          level: {x[0].ContributionCount}
                        </div>
                        <div className="requestee-contributions">
                          contribution count: {x[0].ContributionCount}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-outline-primary" onClick={()=>{approveBtn(props.PostID, x[0].AuthID)}}>Approve</button>
                </div>

                <div className="requestee-about">{x[0].About}</div>
              </div>
            );
          })}
        </div>
      </>
    );
  } else {
    return null;
  }
}

export default RequestyListingModal;