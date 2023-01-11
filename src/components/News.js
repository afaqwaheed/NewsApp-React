import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {
    static defaultProps={
        country:'us',
        pageSize:6,
        category:'general'
     }
 
    static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
 }

  capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            spinner:false,
            page:1,
        }
        document.title=`${this.capitalizeFirstLetter(this.props.category)}-News App`;
    }

    async componentDidMount() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fe521d47bf3045fc8565a53bc8cc0f1a&page=1&pageSize=${this.props.pageSize}`;
        this.props.setProgress(30);
        this.setState({spinner:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.props.setProgress(700);

        this.setState({ 
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            spinner:false
         });
    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&category=${this.props.category}&apiKey=fe521d47bf3045fc8565a53bc8cc0f1a&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
        this.setState({spinner:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page-1,
            articles: parsedData.articles,
            spinner:false
        });
    }

    handleNextClick = async () => {
        if(!this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)){
            
        }
        else{
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&category=${this.props.category}&apiKey=fe521d47bf3045fc8565a53bc8cc0f1a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({spinner:true})
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                spinner:false
            });
        }
    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center py-3' style={{marginTop:'90px'}}>News - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.spinner && <Spinner/>}
                <div className="row my-3">
                    {!this.state.spinner && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title : ''} description={element.description ? element.description : ''} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}
                            source={element.source.name}/>
                        </div>
                    })}

                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>

            </div>
        )
    }
}
