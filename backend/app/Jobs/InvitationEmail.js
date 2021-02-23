'use strict'

const Mail = use('Mail');

class InvitationEmail {
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'InvitationEmail-job'
  }

  // This is where the work is done.
  async handle ({ user, team, email }) {
    await Mail.send(
      ['emails.invitations'],
      {team: team.name, user: user.username},
      message => {
        message.to(email).from('samuel.formigheri@omnistack.com.br', 'Samuel | Omnistack').subject(`Convite para o time ${team.name}`);
      }
    )
  }
}

module.exports = InvitationEmail

