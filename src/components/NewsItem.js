import React from 'react'

const NewsItem =(props) => {
        let { title, description, imageUrl, newsUrl,author,date,source } = props;
        return (
            <>
                <div>
                    <div className="card my-3" style={{ width: "18rem" }}>
                  <div className=' d-flex justify-content-end'>
                  <span className="badge rounded-pill bg-danger position-absolute" style={{fontSize:'14px'}}>{source}</span>
                  </div>
                        <img src={imageUrl ? imageUrl : 'https://i.kinja-img.com/gawker-media/image/upload/…,q_80,w_1200/0d25d00e59b9e3148184355d1425b826.jpg'} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-muted">By {!author?'Unknown':author} on {date}</small></p>
                            <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
                        </div>

                    </div>
                </div>
            </>
        )
}

export default NewsItem
