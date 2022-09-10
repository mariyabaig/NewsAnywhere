import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
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

  async updateNews (){
    console.log("cmd");
    this.setState({loading: true});
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f92c341decba4708b5f26b66b45eeb51&page=4{this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({articles:parsedData.articles ,totalResults: parsedData.totalResults, loading: false})


  }
  capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
    constructor(props){
        super(props);
        console.log("Hello I am a constructor from News component");
        this.state = {
            articles: [],
            loading: true,
            page : 1,
            totalResults:0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - News Anywhere`;
    }
   async componentDidMount(){
      // console.log("cmd");
      // this.setState({loading: true});
      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f92c341decba4708b5f26b66b45eeb51&page=1&pageSize=${this.props.pageSize}`;
      // let data = await fetch(url);
      // let parsedData = await data.json()
      // console.log(parsedData);
      // this.setState({articles:parsedData.articles ,totalResults: parsedData.totalResults, loading: false})
      this.updateNews();
    }
    handlePrevClick = async ()=>{
      console.log("Previous");
      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f92c341decba4708b5f26b66b45eeb51&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      // let data = await fetch(url);
      // let parsedData = await data.json()
      // this.setState({loading:true})
      // console.log(parsedData);  
      // this.setState({
      //     page: this.state.page - 1,
      //     articles: parsedData.articles,
      //     loading: false
      // })
      this.setState({page:this.state.page-1})
      this.updateNews();

  }
  
   handleNextClick = async ()=>{
      console.log("Next"); 
  //     if (this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

  //     }
  //     else{
  //         let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f92c341decba4708b5f26b66b45eeb51&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //         let data = await fetch(url);
  //         let parsedData = await data.json()
  //         this.setState({loading:true})
  //         console.log(parsedData);  
  //         this.setState({
  //             page: this.state.page + 1,
  //             articles: parsedData.articles,
  //             loading: false
  //         })
  // }
  this.setState({page:this.state.page+1})
  this.updateNews();

  }
  fetchMoreData = async () => {  
    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f92c341decba4708b5f26b66b45eeb51&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults
    })
  };


  render() {
    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
            {this.state.loading && <Spinner />}
            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                loader={<Spinner/>}
            > 
                <div className="container">
                     
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgurl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                </div> 
            </InfiniteScroll>

        </>
    )
}
}

export default News







