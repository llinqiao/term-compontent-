import { h, app } from "hyperapp";

const List = ({ lists, actions }) => (
  <div 
    oncreate={() => {
      fetch("/api/topics/hot.json")
        .then(res => {
          return res.json();
        })
        .then(re => {
          actions.setList(re);
        });
    }}
    className="container-border center"
  >
    {lists.map(item => {
      var information = item.url;
      var image = item.member.avatar_normal;
      var id = item.member.id
      return<div className="content">
              <div className="image">
                <img src={image}/>
              </div>
              <div className="item">
                <div className="text">
                  <a href={information}>{item.title}</a>
                </div>
                <a href={information}>{id}</a>
              </div>
            </div>;
    })}
  </div>
);



const state = {
  lists: []
};

const actions = {
  setList: value => state => ({ lists: value })
};

const view = (state, actions) => (
  <div className="container">
    <List lists={state.lists} actions={actions} />
  </div>
);

app(state, actions, view, document.body);