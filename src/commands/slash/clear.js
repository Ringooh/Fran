const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChatInputCommandInteraction } = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false)
    .addNumberOption(options => options
      .setName("amount")
      .setDescription("Provide the amount of messages you intend to delete.")
      .setMinValue(1)
      .setMaxValue(100)
      .setRequired(true)
    )
    .addStringOption(options => options
      .setName("reason")
      .setDescription("Provide the reaso to why you are clearing these messages.")
      .setRequired(true)
    )
    .addUserOption(options => options
      .setName("target")
      .setDescription("Provide the target member to only delete their messages.")
    ),
  testOnly: true,
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction
   *
   */


  run: async (client, interaction) => {
    const Amount = interaction.options.getNumber("amount");
    const Reason = interaction.options.getString("reason");
    const Target = interaction.options.getUser("target");

    const channelMessages = await interaction.channel.messages.fetch();
    // const logChannel = interaction.guild.channels.cache.get("");

    const responseEmbed = EmbedBuilder().setColor("DarkNavy");
    const logEmbed = new EmbedBuilder().setColor("DarkAqua")
      .setAuthor({ name: "CLEAR COMMAND USED" });

    let logEmbedDescription = [
      `Moderator: ${interaction.member}`,
      `Target: ${Target || "None"}`,
      `Channel: ${interaction.channel}`,
      `Reason: ${Reason}`
    ];

    if (Target) {
      let i = 0;
      let messagesToDelete = [];
      channelMessages.filter((message) => {
        if (message.author.id === Target.id && Amount > i) {
          messagesToDelete.push(message);
          i++
        }
      });

      const Transcript = await Transcript.generateFromMessages(messagesToDelete, interaction.channel);

      interaction.channel.bulkDelete(messagesToDelete, true).then((messages) => {
        interaction.reply({
          embeds: [responseEmbed.setDescription(`Cleared \`${messages.size}\` messages from ${Target}`)],
          ephemeral: true
        });

        logEmbedDescription.push(`Total Messages: ${messages.size}`);
        logChannel.send({
          embeds: [logEmbed.setDescription.join("\n")],
          files: [Transcript]
        });
      });

    } else {
      const Transcript = await Transcript.createTranscript(interaction.channel, { limit: Amount });

      interaction.channel.bulkDelete(Amount, true).then((messages) => {
        interaction.reply({
          embeds: [responseEmbed.setDescription(`Cleared \`${messages.size}\` messages.`)],
          ephemeral: true
        });

        logEmbedDescription.push(`Total Messages: ${messages.size}`);
        logChannel.send({
          embeds: [logEmbed.setDescription.join("\n")],
          files: [Transcript]
        });
      });
    }
  }
}