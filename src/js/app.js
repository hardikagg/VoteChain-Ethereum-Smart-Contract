import "../css/style.css"
import { default as Web3} from "web3"
import { default as contract } from "truffle-contract"
import votingArtifacts from "../../build/contracts/Voting.json"
var VotingContract = contract(votingArtifacts.abi)

window.App = {
  start: function() { 
    VotingContract.setProvider(window.web3.currentProvider)
    VotingContract.defaults({from: window.web3.eth.accounts[0],gas:6721975})

    VotingContract.deployed().then(function(instance){
      instance.getNumOfCandidates().then(function(numOfCandidates){
        if (numOfCandidates == 0){
          instance.addCandidate("Candidate1","Democratic").then(function(result){ 
            $("#candidate-box").append(`<div class='form-check'><input class='form-check-input' type='checkbox' value='' id=${result.logs[0].args.candidateID}><label class='form-check-label' for=0>Candidate1</label></div>`)
          })
          instance.addCandidate("Candidate2","Republican").then(function(result){
            $("#candidate-box").append(`<div class='form-check'><input class='form-check-input' type='checkbox' value='' id=${result.logs[0].args.candidateID}><label class='form-check-label' for=1>Candidate1</label></div>`)
          })
          numOfCandidates = 2 
        }
        else { 
          for (var i = 0; i < numOfCandidates; i++ ){
           
            instance.getCandidate(i).then(function(data){
              $("#candidate-box").append(`<div class="form-check"><input class="form-check-input" type="checkbox" value="" id=${data[0]}><label class="form-check-label" for=${data[0]}>${window.web3.toAscii(data[1])}</label></div>`)
            })
          }
        }
        
        window.numOfCandidates = numOfCandidates 
      })
    }).catch(function(err){ 
      console.error("ERROR! " + err.message)
    })
  },

  vote: function() {
    var uid = $("#id-input").val() 
    if (uid == ""){
      $("#msg").html("<p>Please enter id.</p>")
      return
    }
    if ($("#candidate-box :checkbox:checked").length > 0){ 
      var candidateID = $("#candidate-box :checkbox:checked")[0].id
    } 
    else {
      $("#msg").html("<p>Please vote for a candidate.</p>")
      return
    }
    VotingContract.deployed().then(function(instance){
      instance.vote(uid,parseInt(candidateID)).then(function(result){
        $("#msg").html("<p>Voted</p>")
      })
    }).catch(function(err){ 
      console.error("ERROR! " + err.message)
    })
  },

  findNumOfVotes: function() {
    VotingContract.deployed().then(function(instance){
      var box = $("<section></section>") 
      for (var i = 0; i < window.numOfCandidates; i++){
        var candidatePromise = instance.getCandidate(i)
        var votesPromise = instance.totalVotes(i)
       
        Promise.all([candidatePromise,votesPromise]).then(function(data){
          box.append(`<p>${window.web3.toAscii(data[0][1])}: ${data[1]}</p>`)
        }).catch(function(err){ 
          console.error("ERROR! " + err.message)
        })
      }
      $("#vote-box").html(box) 
    })
  }
}


window.addEventListener("load", function() {
  if (typeof web3 !== "undefined") {
    console.warn("Using web3 detected from external source like Metamask")
    console.log(web3.currentProvider);
    window.web3 = new Web3(web3.currentProvider) 
  } else {
    console.warn("No web3 detected.")
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"))
  }
  window.App.start()
})