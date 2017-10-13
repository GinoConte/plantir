//style.js
const style = {

  content:{
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  },
  tile:{
    width: '20%',
    border: '1px solid',
    position: 'relative',
    display: 'inline-block',
  },
  grasstile: {
    backgroundColor: "#9fd64d",
  },
  tilebutton: {
    border: "2px solid ",
    color: "black",
    backgroundColor: "Transparent",
    marginBottom: "5px",
    marginRight: "2px",
    marginLeft: "2px",
  },
  emptybutton: {
    padding: "0",
    border: "none",
    background: "none",
    margin: "none",
  },
  images: {
    width: "8vmin",
    height: "8vmin",
    paddingTop: "4",
    paddingBottom: "5",

  },
  invisibleImage: {
    opacity: 0,    
    width: "8vmin",
    height: "8vmin",
    paddingTop: "4",
    paddingBottom: "5",

  },
  biologybutton: {
    border: "2px solid ",
    color: "black",
    backgroundColor: "Transparent",
    marginBottom: "16px",
    marginRight: "2px",
    marginLeft: "2px",
  },
  tilebox:{
    border: '1px solid',
    position: 'relative',
    display: 'inline-block',
  },
  commentBox: {
    width:'80vw',
    margin:'0 auto',
    fontFamily:'Helvetica, sans-serif'
  },
  title: {
    textAlign:'center',
    textTransform:'uppercase'
  },
  commentList: {
    border:'1px solid #f1f1f1',
    padding:'0 12px',
    maxHeight:'70vh',
    //overflow:'scroll'
  },
  comment: {
    backgroundColor:'#fafafa',
    margin:'10px',
    padding:'3px 10px',
    fontSize:'2rem'
  },
  commentForm: {
    margin:'10px',
    display:'flex',
    flexFlow:'row wrap',
    justifyContent:'space-between'
  },
  commentFormAuthor: {
    minWidth:'150px',
    margin:'3px',
    padding:'0 10px',
    borderRadius:'3px',
    height:'40px',
    flex:'2'
  },
  commentFormText: {
    flex:'4',
    minWidth:'400px',
    margin:'3px',
    padding:'0 10px',
    height:'40px',
    borderRadius:'3px'
  },
  commentFormPost: {
    minWidth:'75px',
    flex:'1',
    height:'40px',
    margin:'5px 3px',
    fontSize:'1rem',
    backgroundColor:'#83b538',
    borderRadius:'3px',
    color:'#000',
    textTransform:'uppercase',
    letterSpacing:'.055rem',
    border:'none'
  },
  searchFormText: {
    flex:'4',
    minWidth:'250px',
    margin:'3px',
    padding:'0 10px',
    height:'40px',
    borderRadius:'3px'
  },

  updateLink: {
    textDecoration:'none',
    paddingRight:'15px',
    fontSize:'1.5rem'
  },
  deleteLink: {
    textDecoration:'none',
    paddingRight:'15px',
    fontSize:'1.5rem',
    color:'red'
  },

}

module.exports = style;