import React from "react";
import "./NGOProfile.css";
import DonationTable from "../../../components/DonationTable/DonationTable";
import BlogPost from "../../../components/BlogPost/BlogPost";

function NGOProfile(props) {

  const donationData = [
    {
      donorName: 'John Doe',
      donatedItem: 'Blankets',
      itemQuantity: 10,
      donationDateTime: '2022-01-28 10:30 PM'
    },
    {
      donorName: 'Jane Smith',
      donatedItem: 'Food',
      itemQuantity: '50 lbs',
      donationDateTime: '2022-01-26 02:45 PM'
    },
    {
      donorName: 'Bob Johnson',
      donatedItem: 'Clothes',
      itemQuantity: 25,
      donationDateTime: '2022-02-25 11:15 AM'
    },
    {
      donorName: 'Alice Brown',
      donatedItem: 'Hygiene Kits',
      itemQuantity: 15,
      donationDateTime: '2022-02-24 06:20 PM'
    },
    {
      donorName: 'Bob Johnson',
      donatedItem: 'Clothes',
      itemQuantity: 25,
      donationDateTime: '2021-12-25 11:15 AM'
    },
    {
      donorName: 'Alice Brown',
      donatedItem: 'Hygiene Kits',
      itemQuantity: 15,
      donationDateTime: '2021-11-24 06:20 PM'
    }
  ];

  const blogData = [
    {
      title: 'Serving 300+ People',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales libero id enim malesuada, id fringilla lacus consectetur. Nullam auctor, nulla vitae sollicitudin faucibus, mauris orci pulvinar felis, eget gravida risus ex vel turpis. Nunc placerat urna id magna tristique, non tristique ex blandit. In quis mauris leo. Nullam vel massa eu sapien faucibus elementum eu eu velit. Mauris vel elit sit amet leo ultricies interdum a eget lacus. Ut porta, leo vel dapibus auctor, nibh dolor vehicula est, vitae lobortis sapien purus quis enim.',
      imageUrl: 'https://media.istockphoto.com/id/1177156986/photo/free-food-for-the-homeless-and-the-hungry-food-donation-concepts.jpg?s=612x612&w=0&k=20&c=J_vrsDpsERIsyej_f0ApIwqOnDEWt1uqfj67LvxloGk='
    },
    {
      title: 'Making Kids Happy',
      content: 'Nullam scelerisque libero vel nisl imperdiet dictum. Curabitur sed lorem ut odio euismod blandit. Nunc fringilla dui felis, sit amet convallis leo elementum at. Duis vel metus vel enim vulputate auctor. Maecenas id fringilla mi. Donec imperdiet metus et ante blandit, eget commodo augue fermentum. Sed varius nisi in orci iaculis, nec tincidunt ex malesuada. Suspendisse at mauris nulla. In dapibus diam non diam hendrerit, in dignissim quam tincidunt. Etiam aliquet bibendum massa, at suscipit ante efficitur sit amet. Quisque blandit orci mi, a ullamcorper augue interdum eu. Praesent pretium ipsum et massa luctus, nec vestibulum nisl pretium. Sed in erat nec augue tristique tincidunt.',
      imageUrl: 'https://www.needforgoodfoundation.com/wp-content/uploads/2021/08/ngo-1366x630.jpg'
    }
  ];

  return (
    <div className="ngo-profile-page d-flex flex-column justify-content-center">
      <div className="cover-container">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2hhcml0eXxlbnwwfHwwfHw%3D&w=1000&q=80"
          alt="ngo cover"
        />
      </div>
      <div className="translateY">
        <div className="ngo-logo d-flex flex-row mb-4">
          <img
            src="https://www.designmantic.com/logo-images/172145.png?company=Company+Name&slogan=&verify=1"
            alt="ngo icon"
          />
          <h1>Juju Foundation</h1>
        </div>
        <div className="about-section d-flex flex-column justify-content-start mb-4">
          <h2 className="section-heaading">ABOUT</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate
            saepe accusantium ducimus, cumque eaque deleniti modi sint?
            Repellendus nemo delectus illum laboriosam perferendis sed possimus
            iusto culpa quos alias in eius rem mollitia minus, laudantium,
            beatae incidunt facere reiciendis sapiente repudiandae! Modi
            voluptatum ab fugit nam vitae, architecto tempore ipsa hic, vero
            totam iure possimus sit dolore inventore, omnis debitis adipisci
            quis optio! Corrupti ex accusantium exercitationem, eos laboriosam
            accusamus ut magnam earum dolorum minus perspiciatis laudantium
            distinctio sunt soluta.
          </p>
        </div>

        <div className="about-section d-flex flex-column justify-content-start mb-4">
          <h2 className="section-heaading">CONTRIBUTION</h2>
          <DonationTable donationData={donationData} />
        </div>
        <div className="about-section d-flex flex-column justify-content-start mb-4">
          <h2 className="section-heaading">BLOGS</h2>
          {blogData.map((blogPost, index) => (
        <BlogPost key={index} title={blogPost.title} content={blogPost.content} imageUrl={blogPost.imageUrl} />
      ))}
        </div>
        <div className="about-section d-flex flex-column justify-content-start mb-4">
          <h2 className="section-heaading">DONATE</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate
            saepe accusantium ducimus, cumque eaque deleniti modi sint?
            Repellendus nemo delectus illum laboriosam perferendis sed possimus
            iusto culpa quos alias in eius rem mollitia minus, laudantium,
            beatae incidunt facere reiciendis sapiente repudiandae! Modi
            voluptatum ab fugit nam vitae, architecto tempore ipsa hic, vero
            totam iure possimus sit dolore inventore, omnis debitis adipisci
            quis optio! Corrupti ex accusantium exercitationem, eos laboriosam
            accusamus ut magnam earum dolorum minus perspiciatis laudantium
            distinctio sunt soluta.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NGOProfile;
