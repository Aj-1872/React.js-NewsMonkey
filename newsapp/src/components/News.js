import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {


  constructor() {
    super();

    console.log("hello fuck you");


    this.state = {

      articles: [],
      loading: false

    }
  }

  async componentDidMount() {

    let url = "https://newsapi.org/v2/everything?q=tesla&from=2023-06-07&sortBy=publishedAt&apiKey=14bc42826e664185a097a05cc18bfa5a";
    let data = await fetch(url);
    let parshData = await data.json()
     this.setState({ articles: parshData.articles })


  }

  render() {
    return (
      <div className="container my-3 ">

        <h2 className="text-center m-3">NewMonkey - Top Headlines</h2>
        <div className='row  '>


          {this.state.articles.map((element) => {

            return (
              <div className="col-md-4 my-1" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 30) : ""}
                  description={element.description ? element.description.slice(0, 75) : " "}
                  imgUrl={element.urlToImage}
                  newsUrl={element.url}
                  style={{ height: '200px', width: '300px' }}
                />
              </div>
            );


          })}



        </div>



      </div>
    )
  }
}
