# README

<details>
  <summary>Quick Links</summary>
  
- [Vinto Design Specifications](https://docs.google.com/document/d/10Fm_WHXpDYoZezVVbXlR9CZoDP--0YnIRoQh3BCuYdg/edit?usp=sharing)
  - [Wireframe and Frontend State](https://docs.google.com/presentation/d/1AFjcZvJZWQtv_HhX-1dZmH0AtKYrF7m3alAe72k7LT4/edit?usp=sharing)
  - [Schema and API](https://drive.google.com/file/d/1veoxu8lWvBJcykzOP_nmxFGTidL7ea84/view)
- [Vinto Project Board](https://github.com/orgs/mohicans-pop-2008/projects/1) to get a sense of what we are actually working on.
</details>

## About

Built by Chikara Takahashi, Kevin Hu, and S. Tanveer Shah. Deployed version at [vinto.app](https://vinto.app).

> Vinto is a videoconferencing solution that emphasizes realtime non-verbal interactions between participants.

Vinto allows participants to join a room, have a video conference, and communicate non-verbally through hand raises, and - in the future - through even more forms of expression, e.g. claps, queueing up to ask a question, emojis, etc.

Under the hood, Vinto uses lib-jitsi-meet, an API that wraps around WebRTC technology and is designed to set up video conferences on a server running [jitsi-meet](https://github.com/jitsi/jitsi-meet) (e.g. [meet.jit.si](https://meet.jit.si/)). Vinto also implements a [socket.io](https://socket.io) server to orchestrate real-time interactions like hand raises, etc.

Finally, everything is rendered with React, front-end state is managed by Redux stores, and icons/components are from the beautiful material-ui and styled-icons libraries. Where necessary, Vinto implements Promises to ensure that React can respond appropriately to lib-jitsi-meet events, e.g. rendering a conference only after it has been connected to and initialized correctly on the meeting server (i.e. [meet.jit.si](https://meet.jit.si/)) by default.

## Contribution Guidelines

Source: [Mohicans Team Contract and Norms](https://docs.google.com/document/d/1aHNAhwWkPEynwzW29mGgXruK7I7cTa0y4Q_sDHNT3Wk/edit?usp=sharing)

- Roles
  - 📅 Project Manager (PM)
    - Communicate the target tasks at the beginning of each day.
    - Lead the morning standup.
  - 🔃 Head of Code Quality and Version Control (HVC)
    - Lead end-of-the-day PR/merge party.
    - Whispers words of encouragement to commit often, commit democratic.
  - 📲 DevOps Guru (DOG)
    - Makes sure our tests pass and deploys are always working.
    - Leads a daily learning session.

### Role Assignments

|     10/12 |     10/13 |     10/14 |     10/15 |     10/16 |
|----------:|----------:|----------:|----------:|----------:|
| 📅 Chikara | 📅 Kevin   | 📅 Tanveer | 📅 Chikara | 📅 Kevin   |
| 🔃 Tanveer | 🔃 Chikara | 🔃 Kevin   | 🔃 Tanveer | 🔃 Chikara |
| 📲 Kevin   | 📲 Tanveer | 📲 Chikara | 📲 Kevin   | 📲 Tanveer |

|     10/19 |     10/20 |     10/21 |     10/22 |     10/23 |
|----------:|----------:|----------:|----------:|----------:|
| 📅 Tanveer | 📅 Chikara | 📅 Kevin   | 📅 Tanveer | 📅 Chikara |
| 🔃 Kevin   | 🔃 Tanveer | 🔃 Chikara | 🔃 Kevin   | 🔃 Tanveer |
| 📲 Chikara | 📲 Kevin   | 📲 Tanveer | 📲 Chikara | 📲 Kevin   |

### Daily Process

- @10:35 (after REACTO), PM leads morning standup 
  - Everybody: Yesterday? Today? Obstacles?
  - HVC repo and branch updates
  - DevOps deployment and testing updates
  - (OPTIONAL: Daily learning session)
- @10:50, PM delegates tasks
  - Group discussion is useful for defining and outlining a difficult or complex problem / making lots of architectural or workflow related decisions.
  - Pair programming is useful for tackling complex tasks or for when both team members are relatively unfamiliar with a given topic/tool/task.
  - Solo tasks are useful for tasks that are well-defined and that we know how to do.
- After problems defined and tasks clearly delegated ... we work! While working...
  - Everyone will keep track of issues they encounter that are non-blocking to be discussed right after lunch at re-group meeting.
  - Bring up any blocking issues after an earnest effort (up to half an hour) of spinning your wheels.
- @14:30 EST, PM leads re-group meeting to check-in with blockers, status updates, and plan for EOD merge.
- @17:30 EST, HVC leads PR/Merge reviews as needed.

## Background

- [Vinto Design Specifications](https://docs.google.com/document/d/10Fm_WHXpDYoZezVVbXlR9CZoDP--0YnIRoQh3BCuYdg/edit?usp=sharing)
  - [Wireframe and Frontend State](https://docs.google.com/presentation/d/1AFjcZvJZWQtv_HhX-1dZmH0AtKYrF7m3alAe72k7LT4/edit?usp=sharing)
  - [Schema and API](https://drive.google.com/file/d/1veoxu8lWvBJcykzOP_nmxFGTidL7ea84/view)

### Key Ingredients
<img src="https://embed.creately.com/xC8wnKn63IY?token=GN2A93FluMC4doDQ&type=svg">

- A jitsi-meet server (currently using meet.jit.si) / self-hosted server also possible.
- A very specific working version of "lib-jitsi-meet": "github:jitsi/lib-jitsi-meet#15dcc57424cc937290e1963b8eb402c1fcf48ccb".

<img src="https://embed.creately.com/6CjggNvGTBE?token=VgFz8YTVxZms4yYo&type=svg">
## Project Status

Also see the [Vinto Project Board](https://github.com/orgs/mohicans-pop-2008/projects/1) to get a sense of what we are actually working on.

### Milestone 1 : Code Review : Proof of Concept : DUE 10/12/2020 15:00 EST

Before Monday code review we want:

#### Video
- [x] A user can join a jitsi conference through Vinto.
- [x] Another user could join the same conference through Vinto.
- [x] Users can see other users in the same conference rendered in Vinto.
- [x] Users can shut off their own video.

#### Audio
- see Video
- [x] Users can mute themselves within Vinto and no one else can hear them. (use Track.mute in lib-jitsi-api)

#### Screen
- [ ] A user should be able to toggle share screen mode in Vinto.
- [ ] Other users in the same conference should be able to see the screen that is being shared.

#### Feedback
- [ ] The presenter should be able to see an icon (i.e. Engagement score) that reflects number of audience member cameras on.
  - [ ] Vinto counts the number of users there are.
  - [ ] Vinto counts the number of cameras are on.
- [ ] (OPTIONAL: A user should be able to raise AND lower their hand.)
- [ ] (OPTIONAL: All users should be able to see an icon with number of raised hands when hands our raised.)

### Milestone 2 : Beta : DUE 10/16/2020

#### State
- [x] There should be a single conference.
- [ ] We should be able to tell how many people are in a conference.
- [x] Should have every single video track in a given conference, number of participants.
- [x] Should have every single audio track EXCEPT for the local audio track, i.e. number of participants - 1.

#### Video
- [ ] When shutting off video, the user cell should go black, and every user should see this same view.
  - [ ] When shutting off video, some other users see - we do not want any of these inconsistencies:
    - [x] frozen video feed
    - [x] blank white cell
    - [x] cell disappears
- [x] When turning video back on, every user should then see live video feed.

#### Audio
- [x] When all 3 people were in the conference, some users saw 3 audio tracks in their local state, when they expected to have only 2.
- [ ] Why is Tanveer's audio so bad coming through Jitsi?
- [ ] Audio quality should be decent most of the time.

#### Preparation for Beta : DUE 10/14/2020
- [ ] What do we actually want users to test?

#### Deploy
- [ ] Build for deployment.
- [ ] Get it running on Heroku.
- [ ] How to deploy a Neutrino-based application?
- [ ] Set up CI and continuous deployment.

#### Layout
- [ ] The application should exist within its own window.
- [ ] Buttons should remain in fixed positions as long as my viewport is constant.

#### Real-time Feedback
- [ ] Create a socket to make it possible for the below feedback features to work.
- [ ] Engagement score should always reflect the number of videos turned on divided by total video cells.
- [ ] All users should be able to see the number of hands raised.
- [ ] All users should be able to see when claps, and other reactions occur.
- [ ] Presenters should be able to see who has raised their hands and in what order.

### Milestone 3 : Code Review : DUE 10/19/2020

### Milestone 4 : Code Freeze : DUE 14:00 EST 10/23/2020
