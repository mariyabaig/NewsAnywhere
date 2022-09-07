import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {
    
  static defaultProps={
    country :'in',
    pageSize : 5,
    category: 'general',

  }
  static propTypes= {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
    constructor(){
        super();
        console.log("Hello I am a constructor from News component");
        this.state = {
            articles: [],
            loading: false,
            page : 1
        }
    }
   async componentDidMount(){
      console.log("cmd");
      this.setState({loading: true});
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f92c341decba4708b5f26b66b45eeb51&page=1&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({articles:parsedData.articles ,totalResults: parsedData.totalResults, loading: false})
    }
    handlePrevClick = async ()=>{
      console.log("Previous");
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f92c341decba4708b5f26b66b45eeb51&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({loading:true})
      console.log(parsedData);  
      this.setState({
          page: this.state.page - 1,
          articles: parsedData.articles,
          loading: false
      })

  }
  
   handleNextClick = async ()=>{
      console.log("Next"); 
      if (this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

      }
      else{
          let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f92c341decba4708b5f26b66b45eeb51&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
          let data = await fetch(url);
          let parsedData = await data.json()
          this.setState({loading:true})
          console.log(parsedData);  
          this.setState({
              page: this.state.page + 1,
              articles: parsedData.articles,
              loading: false
          })
  }
  }

    render() {
      console.log("render")
        return (<div className="container my-3">
          <h2 className="text-center"  style={{margin : '40px 0px'}}>NewsMonkey - Top Headlines</h2>
          {this.state.loading && <Spinner/>}
            <div className="container my-3 = 'true'">
             <div className="row">
                
                {!this.state.loading && this.state.articles.map((element)=>{
                    return  <div className="col-md-4" key = {element.url}>
                        <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imgurl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt}source={element.source.name}/>
                    </div>
                   
                    
                
                })}
                </div>
            </div>
            <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
        
    }
}

export default News;