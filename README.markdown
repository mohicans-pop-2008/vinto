# README 

* index.html - simple interface
* index.js - has basic DOM manipulations necessary to create a meeting

## Background

We are able to start meetings on meet.jit.si servers from an app on our local computer.

## Minimum Viable Product

### Milestone 1 : Code Review : Proof of Concept : DUE 10/12/2020 15:00 EST

Before Monday code review we want:

#### Video
- [ ] A user can join a jitsi conference through Vinto.
- [ ] Another user could join the same conference through Vinto.
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
