  }

  isStudent(peerId: string) {
    if (!`${peerId}`
      || `${this.state.course.teacherId}` === `${peerId}`
    ) return false;

    return true;
  }

  async fetchCurrentRoom() {
    try {
      const res = await eduApi.fetchRoomBy(roomStore.state.course.roomId);
      const {
        course,
        me,
        users: rawUsers,
        appID,
        onlineUsers
      } = res

      let users = rawUsers.reduce((acc: Map<string, AgoraUser>, it: any) => {
        return acc.set(`${it.uid}`, {
          role: it.role,
          account: it.userName,
          uid: it.uid,
          video: it.enableVideo,
          audio: it.enableAudio,
          chat: it.enableChat,
          grantBoard: it.grantBoard,
          userId: it.userId,
          screenId: it.screenId,
        });
      }, Map<string, AgoraUser>());

      await this.rtmClient.login(appID, `${me.uid}`, me.rtmToken)
      await this.rtmClient.join(course.rid)
      this.state = {
        ...this.state,
        rtm: {
          ...this.state.rtm,
          joined: true,
        },
        course: {
          ...this.state.course,
          rid: course.channelName,
          roomType: course.roomType,
          roomId: course.roomId,
          roomName: course.roomName,
          courseState: course.courseState,
          muteChat: course.muteAllChat,
          recordId: `${course.recordId}`,
          isRecording: course.isRecording,
          recordingTime: course.recordingTime,
          lockBoard: course.lockBoard,
          boardId: `${course.boardId}`,
          boardToken: `${course.boardToken}`,
          teacherId: `${course.teacherId}`,
          screenId: `${me.screenId}`,
          screenToken: `${me.screenToken}`,
          coVideoUids: course.coVideoUids,
          memberCount: +onlineUsers,
        },
        me: {
          ...this.state.me,
          uid: me.uid,
          account: me.userName,
          rtmToken: me.rtmToken,
          rtcToken: me.rtcToken,
          channelName: me.channelName,
          screenId: me.screenId,
          screenToken: me.screenToken,
          appID: me.appID,
          role: me.role,
          chat: me.enableChat,
          video: me.enableVideo,
          audio: me.enableAudio,
          userId: me.userId,
          coVideo: me.coVideo,
        },
