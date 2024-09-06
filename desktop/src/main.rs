// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use color_eyre::{install, Result};
use tauri::{command, generate_context, generate_handler, Builder};

#[command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() -> Result<()> {
    install()?;

    Builder::default()
        .invoke_handler(generate_handler![greet])
        .run(generate_context!())?;

    Ok(())
}
