import React from 'react'

const SearchFrom = ({search,setNumPage,handleInput}) => {
  const handleSubmit = (e) =>{
    e.preventDefault()
    setNumPage(0)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row mb-3">
        <label htmlFor="inputText" className="col-sm-2 col-form-label">Search</label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id="inputText" name="inputText" onChange={handleInput}
          value={search.inputText}/>
        </div>
      </div>
      <fieldset className="row mb-3">
        <legend className="col-form-label col-sm-2 pt-0">Filter</legend>
        <div className="col-sm-10">
          <div className="form-check">
            <input className="form-check-input" type="radio" name="inputRadio" id="username"  value="username" onChange={handleInput}/>
            <label className="form-check-label" htmlFor="username">
              Username
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="inputRadio" id="title" value="title" onChange={handleInput}/>
            <label className="form-check-label" htmlFor="title">
              Title
            </label>
          </div>
        </div>
      </fieldset>
      <button type="submit" className="btn btn-primary">Search</button>
    </form>
  )
}

export default SearchFrom