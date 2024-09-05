use color_eyre::{install, Result};
use memmap2::Mmap;
use serde::Serialize;
use serde_json::to_string;
use source2_demo::prelude::*;
use source2_demo::proto::*;

#[derive(Default, Serialize)]
struct Stats {
    match_info: Option<c_msg_match_meta_data_contents::MatchInfo>,
}

#[observer]
impl Stats {
    #[on_message]
    fn citadel_user_message(
        &mut self,
        _: &Context,
        msg: CCitadelUserMsgPostMatchDetails,
    ) -> ObserverResult {
        if let Some(match_info) = CMsgMatchMetaDataContents::decode(msg.match_details())?.match_info
        {
            self.match_info = Some(match_info);
        };

        println!("{}", to_string(&self)?);

        Ok(())
    }
}

fn main() -> Result<()> {
    install()?;

    let args = std::env::args().collect::<Vec<_>>();

    let Some(filepath) = args.get(1) else {
        eprintln!("Usage: {} <replay_file>", args[0]);
        return Ok(());
    };

    let replay = unsafe { Mmap::map(&std::fs::File::open(filepath)?)? };
    let mut parser = Parser::new(&replay)?;

    parser.register_observer::<Stats>();
    parser.run_to_end()?;

    Ok(())
}
