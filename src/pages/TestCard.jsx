import React, { useEffect } from 'react';
import $ from 'jquery';
import styles from '../styles/profile.module.scss';

const TestCard = () => {
  useEffect (()=> {
    
  })
  return (
    <div className={styles['profile-css']}>
      <div className={styles['profile-header']}>
        <div className={styles['profile-img']}>
          <img src="./bg.jpg" width={200} alt="Profile Image" />
        </div>
        <div className={styles['profile-nav-info']}>
          <h3 className={styles['user-name']}>Bright Code</h3>
          <div className={styles['address']}>
            <p id="state" className={styles['state']}>New York,</p>
            <span id="country" className={styles['country']}>USA.</span>
          </div>
        </div>
        <div className={styles['profile-option']}>
          <div className={styles['notification']}>
            <i className="fa fa-bell" />
            <span className={styles['alert-message']}>3</span>
          </div>
        </div>
      </div>
      <div className={styles['main-bd']}>
        <div className={styles['left-side']}>
          <div className={styles['profile-side']}>
            <p className={styles['mobile-no']}><i className="fa fa-phone" /> +23470xxxxx700</p>
            <p className={styles['user-mail']}><i className="fa fa-envelope" /> Brightisaac80@gmail.com</p>
            <div className={styles['user-bio']}>
              <h3>Bio</h3>
              <p className={styles['bio']}>
                Lorem ipsum dolor sit amet, hello how consectetur adipisicing elit. Sint consectetur provident magni yohoho consequuntur, voluptatibus ghdfff exercitationem at quis similique. Optio, amet!
              </p>
            </div>
            <div className={styles['profile-btn']}>
              <button className={styles['chatbtn']} id="chatBtn"><i className="fa fa-comment" /> Chat</button>
              <button className={styles['createbtn']} id="Create-post"><i className="fa fa-plus" /> Create</button>
            </div>
            <div className={styles['user-rating']}>
              <h3 className={styles['rating']}>4.5</h3>
              <div className={styles['rate']}>
                <div className={styles['star-outer']}>
                  <div className={styles['star-inner']}>
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </div>
                </div>
                <span className={styles['no-of-user-rate']}><span>123</span>&nbsp;&nbsp;reviews</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles['right-side']}>
          <div className={styles['nav']}>
            <ul>
              <li onClick="tabs(0)" className={`${styles['user-post']} ${styles['active']}`}>Posts</li>
              <li onClick="tabs(1)" className={styles['user-review']}>Reviews</li>
              <li onClick="tabs(2)" className={styles['user-setting']}>Settings</li>
            </ul>
          </div>
          <div className={styles['profile-body']}>
            <div className={`${styles['profile-posts']} ${styles['tab']}`}>
              <h1>Your Post</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa quia sunt itaque ut libero cupiditate ullam qui velit laborum placeat doloribus, non tempore nisi ratione error rem minima ducimus. Accusamus adipisci quasi at itaque repellat sed
                magni eius magnam repellendus. Quidem inventore repudiandae sunt odit. Aliquid facilis fugiat earum ex officia eveniet, nisi, similique ad ullam repudiandae molestias aspernatur qui autem, nam? Cupiditate ut quasi iste, eos perspiciatis maiores
                molestiae.</p>
            </div>
            <div className={`${styles['profile-reviews']} ${styles['tab']}`}>
              <h1>User reviews</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam pariatur officia, aperiam quidem quasi, tenetur molestiae. Architecto mollitia laborum possimus iste esse. Perferendis tempora consectetur, quae qui nihil voluptas. Maiores debitis
                repellendus excepturi quisquam temporibus quam nobis voluptatem, reiciendis distinctio deserunt vitae! Maxime provident, distinctio animi commodi nemo, eveniet fugit porro quos nesciunt quidem a, corporis nisi dolorum minus sit eaque error
                sequi ullam. Quidem ut fugiat, praesentium velit aliquam!</p>
            </div>
            <div className={`${styles['profile-settings']} ${styles['tab']}`}>
              <div className={styles['account-setting']}>
                <h1>Account Setting</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit omnis eaque, expedita nostrum, facere libero provident laudantium. Quis, hic doloribus! Laboriosam nemo tempora praesentium. Culpa quo velit omnis, debitis maxime, sequi
                  animi dolores commodi odio placeat, magnam, cupiditate facilis impedit veniam? Soluta aliquam excepturi illum natus adipisci ipsum quo, voluptatem, nemo, commodi, molestiae doloribus magni et. Cum, saepe enim quam voluptatum vel debitis
                  nihil, recusandae, omnis officiis tenetur, ullam rerum.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCard;
