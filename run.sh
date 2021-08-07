#!/bin/bash

source /home/aris/mambaforge/etc/profile.d/conda.sh
conda activate reconnect

cd app && npm start
