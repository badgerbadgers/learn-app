const footer = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FF5C35',
    textAlign: 'center',
    paddingTop: '20px', 
    paddingBottom: '20px', 
    zIndex: '-99'
    /* fontSize: '1rem'  */     
  }

const Footer = () => {
    return <footer style={footer}><div>COPYRIGHT © 2022 CODE THE DREAM · ALL RIGHTS RESERVED · WEBSITE BY CODE THE DREAM</div></footer>
}
export default Footer