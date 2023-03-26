import React from 'react';
// import { QuickStat } from '../../components/QuickStat';
export interface HomeProps {}

const Home : React.FC<HomeProps> = () => {
	return (
		<>
			<main className='main-content bgc-grey-100'>
          		<div id='mainContent'>
				  <div className="row gap-20 masonry pos-r">
					<div className="masonry-sizer col-md-6"></div>
						<div className="masonry-item  w-100">
							{/* <div className="row gap-20">
								<QuickStat title='Total Visits' percentage={10} earning={true} />
							</div> */}
							<p>Home</p>
						</div>
					</div>	
				</div>
			</main>
		</>
	);
};

export default Home;
