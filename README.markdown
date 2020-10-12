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
- [ ] A user can join a jitsi conference through Vinto.
- [ ] Another user could join the same conference through Vinto.
  - [ ] `[modules/connectivity/ParticipantConnectionStatus.js] <g.onTrackRtcMuted>:  No participant for id: 62c19bbc`
  - [ ] `2020-10-12T10:28:52.260Z [modules/RTC/BridgeChannel.js] <l._send>:  Bridge Channel send: no opened channel.` Occurs periodically throughout conference, typically two at a time, with the below warning in between.
  - [ ] warning `2020-10-12T10:30:08.236Z [JitsiConference.js] <u.sendMessage>:  Failed to send E2E ping request or response. undefined`
  - [ ] `GET http://localhost:5000/sockjs-node/info?t=1602498782547 net::ERR_CONNECTION_REFUSED`
- [ ] Users can see other users in the same conference rendered in Vinto.
- [ ] Users can shut off their own video.

#### Audio
- see Video
- [ ] Users can mute themselves within Vinto. (use Track.mute in lib-jitsi-api)

#### Screen
- [ ] A user should be able to toggle share screen mode in Vinto.
- [ ] Other users in the same conference should be able to see the screen that is being shared.

#### Feedback
- [ ] The presenter should be able to see an icon (i.e. Engagement score) that reflects number of audience member cameras on.
- [ ] (OPTIONAL: A user should be able to raise AND lower their hand.)
- [ ] (OPTIONAL: All users should be able to see an icon with number of raised hands when hands our raised.)

#### Task Breakdown

*Components*

- [ ] Audio track component
- [ ] UI Container
  - [ ] Main content window
    - [ ] Video window gallery mode
    - [ ] Screen share window
  - [ ] Meeting controls bottom bar
    - [ ] Screen share button
    - [ ] Mute/Unmute button
    - [ ] Video On/Off button
    - [ ] Raise/lower hand button
  - [ ] Icons side bar
    - [ ] Engagement score icon
    - [ ] Hands raised icon

*State*

- [ ] Use boilermaker scaffolding
- [ ] Hand raise behavior
- [ ] Hand raise counter
- [ ] Video Mute behavior
- [ ] Audio Mute behavior
- [ ] Screen share and gallery mode toggle
- [ ] Engagement score counter

### Milestone 2 : Beta : DUE 10/16/2020

### Milestone 3 : Code Review : DUE 10/19/2020

### Milestone 4 : Code Freeze : DUE 14:00 EST 10/23/2020
