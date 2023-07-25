import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';


export default class News extends Component {
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

  async componentDidMount() {

    this.setState({loading:true});
    let apiKey = '14bc42826e664185a097a05cc18bfa5a';
    let url = `https://newsapi.org/v2/everything?q=apple&from=2023-07-07&to=2023-07-07&sortBy=popularity&apiKey=${apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    console.log('API URL:', url);

    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log('Fetched data:', parsedData);
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

  handlePrevious = async () => {
    this.setState({loading:true})
    await this.setState((prevState) => ({
      page: prevState.page - 1,
    }));
    await this.componentDidMount();
  };

  handleNext = async () => {
    if (this.state.page >= Math.ceil(this.state.totalResults / 20)) {
      // Prevent going beyond the last page
      return;
    } else {

      this.setState({loading:true})
      await this.setState((prevState) => ({
        page: prevState.page + 1,
      }));
      await this.componentDidMount();
    }
  };

  render() {
    const { articles, page, totalResults, loading, error } = this.state;


    return (
      <div className="container my-3">
        <h2 className="text-center m-3">NewMonkey - Top Headlines</h2>
       <p className='text-center'>
       {loading &&<Spinner/>}
       </p> 
        <div className="row">
          {loading || articles.map((element) => {
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
          <div className="container d-flex justify-content-between">
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
          </div>
        </div>
      </div>
    );
  }
}
