import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';



export default class News extends Component {

  static defaultProps = {
    // pageSize: 20,
    category: 'general'

  }
  static propTypes = {

    // pageSize: PropTypes.number,
    category: PropTypes.string

  }



  constructor() {
    super();

    this.state = {
      articles: [],
      page: 1,
      loading: false,
      totalResults: 0,
      error: null,

    };

  }

  updateNews = async () => {

    this.setState({ loading: true });
    let apiKey = '14bc42826e664185a097a05cc18bfa5a';
    let url = ` https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${apiKey}`;


    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('API error:', error);
      this.setState({
        articles: [],
        loading: false,
        error: 'Failed to fetch news data.',
      });
    }

  }

  async componentDidMount() {
    // Fetch initial news data
    await this.updateNews();
  }

  async componentDidUpdate(prevProps) {
    console.log('Component did update');
    if (prevProps.category !== this.props.category) {
      // Reset the page number when the category changes
      this.setState({ page: 1 }, async () => {
        // Fetch news for the new category
        await this.updateNews();
      });
    }
  }
  
  //  { handlePrevious = async () => {
  //     this.setState({ loading: true })
  //     this.setState((prevState) => ({
  //       page: prevState.page - 1,
  //     }));
  //     await this.updateNews();
  //   };

  //   handleNext = async () => {
  //     if (this.state.page >= Math.ceil(this.state.totalResults / 20)) {
  //       // Prevent going beyond the last page
  //       return;
  //     } else {

  //       this.setState({ loading: true })
  //       this.setState((prevState) => ({
  //         page: prevState.page + 1,
  //       }));
  //       await this.updateNews();
  //     }
  //   };}

  fetchMoreData = async () => {
    this.setState({ loading: true });
    let apiKey = '14bc42826e664185a097a05cc18bfa5a';
    let url = ` https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${apiKey}`;


      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        loading:false
      });
   
  }

  render() {
    const { articles, page, totalResults, loading, error } = this.state;


    return (
      <div className="container my-3">
        <h2 className="text-center m-3">NewMonkey - Top Headlines</h2>
        <p className='text-center'>
          {/*loading &&<Spinner/>*/}
        </p>
        <InfiniteScroll
          dataLength={articles.length}
          next={this.fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="row">
            {/*loading || */articles.map((element) => {
              return (
                <div className="col-md-4 my-1" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 30) : ''}
                    description={element.description ? element.description.slice(0, 75) : ' '}
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    style={{ height: '200px', width: '300px' }}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>

        { /*<div className="container d-flex justify-content-between">
              <button
                disabled={page <= 1}
                onClick={this.handlePrevious}
                type="button"
                className="btn btn-primary"
              >
                Previous
              </button>
              <button
                disabled={page >= 3}
                onClick={this.handleNext}
                type="button"
                className="btn btn-primary"
              >
                Next
              </button>
            </div>*/}
      </div>
    );
  }
}
