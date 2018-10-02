class ViewPost extends Component {
    constructor(props){
      super(props);
    this.state = {
      items: []
    }
    this.deleteItem = this.deleteItem.bind(this);
    this.daleLike = this.daleLike.bind(this);
    this.editCard = this.editCard.bind(this);
    this.itemsRef = firebase.database().ref('postuser')  
    this.likesyes = firebase.database() 
    
  }
  
    componentDidMount(){
      const {items} = this.state;
      this.itemsRef.on('child_added', newPost => {
        items.push({
          id: newPost.key, 
          text: newPost.val().text,
          user: newPost.val().creatorcorreo, 
          year: newPost.val().year , 
          likes: newPost.val().likes
        })
        this.setState({items})
      })
  
      this.itemsRef.on('child_removed', removepost => {
        for (let i = 0; i < items.length; i++) {
         if (items[i].id == removepost.key)  {
          items.splice(i,1)
         }
          
        }
        
        this.setState({items})
      })
      this.itemsRef.on('child_changed',cambios =>{
        for (let i = 0; i < items.length; i++) {
          if (items[i].id == cambios.key)  {
             items[i].likes = cambios.val().likes
             items[i].text = cambios.val().text
          }
         }
         this.setState({items})
         console.log(this.state.items)
      })
      
      
    }
  
        componentWillUnmount() {
          firebase.database().ref('postuser').off()
        }
  
        deleteItem(id){
          this.itemsRef.child(id).remove()
        }
      
        editCard(id,text){
          this.itemsRef.child(id).update({
            text: text
           })
          console.log(`id: ${id}, text: ${text}`);
        }
         
       
    render() {
  
      return (
  
         <Grid container justify="center" >
         
        {
            this.state.items.map(e => {
              
              return (
               
                
                <Grid  item key={e.id}  xs={12} sm={6} lg={5} xl={6} style={{padding: 17}} >
                  <Cardpost key={e.id} id={e.id} texto={e.text} edit={this.editCard} delete={this.deleteItem}  horario={e.year}  ></Cardpost>
                </Grid>
               
               
                
              )
            })
          }
          
          </Grid>
      );
    }
      
  
  }
  
  export default ViewPost;