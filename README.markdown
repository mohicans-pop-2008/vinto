# README 

## Contribution Guidelines

- [Mohicans Team Contract and Norms](https://docs.google.com/document/d/1aHNAhwWkPEynwzW29mGgXruK7I7cTa0y4Q_sDHNT3Wk/edit?usp=sharing)
  - Roles
    - 📅 Project Manager (PM)
      - Communicate the target tasks at the beginning of each day.
      - Lead the morning standup.
    - 🔃 Head of Code Quality and Version Control (HVC)
      - Lead end-of-the-day PR/merge party.
    - 📲 DevOps Guru (DOG)
      - Makes sure our tests pass and deploys are always working.
      - Leads a daily learning session.

- [Vinto Design Specifications](https://docs.google.com/document/d/10Fm_WHXpDYoZezVVbXlR9CZoDP--0YnIRoQh3BCuYdg/edit?usp=sharing)
  - [Wireframe and Frontend State](https://docs.google.com/presentation/d/1AFjcZvJZWQtv_HhX-1dZmH0AtKYrF7m3alAe72k7LT4/edit?usp=sharing)
  - [Schema and API](https://drive.google.com/file/d/1veoxu8lWvBJcykzOP_nmxFGTidL7ea84/view)

- [Vinto Project Board](https://github.com/orgs/mohicans-pop-2008/projects/1)

### Role Assignments

- 10/12
  - 📅 Chikara
  - 🔃 Tanveer
  - 📲 Kevin
- 10/13
  - 📅 Kevin
  - 🔃 Chikara
  - 📲 Tanveer
- 10/14
  - 📅 Tanveer
  - 🔃 Kevin
  - 📲 Chikara
- 10/15
  - 📅 Chikara
  - 🔃 Tanveer
  - 📲 Kevin
- 10/16
  - 📅 Kevin
  - 🔃 Chikara
  - 📲 Tanveer

## Background

We are able to start meetings on meet.jit.si servers from an app on our local computer.

## Minimum Viable Product

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
