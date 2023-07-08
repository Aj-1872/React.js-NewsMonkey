import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NewsItem from './NewsItem';

class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    await this.fetchArticles();
  }

  fetchArticles = async () => {
    const { page } = this.state;
    const apiKey = '14bc42826e664185a097a05cc18bfa5a'; // Replace with your actual API key
    const url = `https://newsapi.org/v2/everything?q=apple&from=2023-07-07&to=2023-07-07&sortBy=popularity&apiKey=${apiKey}&page=${page}&pageSize=20`;
    try {
      this.setState({ loading: true });
      const response = await fetch(url);
      const data = await response.json();
      this.setState({ articles: data.articles, totalArticals : data.totalResults });
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  handlePreviousClick = async () => {
    this.setState(
      prevState => ({ page: prevState.page - 1 }),
      () => this.fetchArticles()
    );
  };

  handleNextClick = async () => {

    if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){

      return;
    }
    else{
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => this.fetchArticles()
    );
    }
  };

  render() {
    const { articles, loading, page } = this.state;

    return (
      <div className="container my-3">
        <h2 className="text-center m-3">NewMonkey - Top Headlines</h2>
        <div className="row">
          {articles.map(element => (
            <div className="col-md-4 my-1" key={element.url}>
              <NewsItem
                title={element.title ? element.title.slice(0, 30) : ''}
                description={element.description ? element.description.slice(0, 75) : ''}
                imgUrl={element.urlToImage}
                newsUrl={element.url}
                style={{ height: '200px', width: '300px' }}
              />
            </div>
          ))}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1 || loading}
            type="button"
            className="btn btn-primary m-3"
            onClick={this.handlePreviousClick}
          >
            Previous
          </button>
          <button
            disabled={loading}
            type="button"
            className="btn btn-primary m-3"
            onClick={this.handleNextClick}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

News.propTypes = {
  // Define prop types here if needed
};

export default News;
